using Microsoft.VisualStudio.TestTools.UnitTesting;
using Minio;
using Minio.DataModel;
using Moq;
using ProfileStateService;
using ProfileStateService.Internal;
using Sso.Remoting.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SsoUnitTests.ProfileStateService
{
    [TestClass]
    public class UsesrDataStorageService : UnitTestBase
    {
        class MockMinioUserDataStorageService : MinioUserDataStorageService
        {
            public Mock<IObjectOperations> MoqObject;
            public Mock<IBucketOperations> MoqBucket;

            public MockMinioUserDataStorageService(MinioOption option) : base(option)
            {

            }
            protected override IObjectOperations GetObjectOperations()
            {
                var mock = new Mock<IObjectOperations>();
                mock.Setup(u => u.PutObjectAsync(It.Is<string>(x => x == "userexported"), It.IsAny<string>(),
                    It.IsAny<Stream>(), It.IsAny<long>(), It.IsAny<string>(), It.IsAny<Dictionary<string, string>>(),
                    It.IsAny<ServerSideEncryption>(),
                    It.IsAny<CancellationToken>())).Returns(Task.FromResult(0));
                this.MoqObject = mock;
                return mock.Object;
            }

            protected override IBucketOperations GetBucketOperations()
            {
                var mock = new Mock<IBucketOperations>();
                mock.Setup(u => u.BucketExistsAsync(It.Is<string>(x => x == "userexported"), It.IsAny<CancellationToken>())).ReturnsAsync(false);
                mock.Setup(u => u.MakeBucketAsync(It.Is<string>(x => x == "userexported"), It.IsAny<string>(),
                    It.IsAny<CancellationToken>())).Returns(Task.FromResult(0));
                this.MoqBucket = mock;
                return mock.Object;
            }
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public async Task SaveUserDataAsyncTest_ThrowException()
        {
            MinioOption option = null;
            var stream = new MemoryStream(Encoding.UTF8.GetBytes("测试数据"));
            var service = new MinioUserDataStorageService(option);
            await service.SaveUserDataAsync(new UserDataFileDto()
            {
                PartitionId = "111",
                Timestamp = "sss"
            }, stream);
        }

        [TestMethod]
        public async Task SaveUserDataAsyncTest_Correct()
        {
            var service = new MockMinioUserDataStorageService(this.Minioption);
            var file = new UserDataFileDto()
            {
                PartitionId = "12345",
                Timestamp = "12345"
            };
            var Memorystream = new MemoryStream(Encoding.UTF8.GetBytes("测试数据"));
            await service.SaveUserDataAsync(file, Memorystream);

            //Act:
            var mockObject = service.MoqObject;
            var mockBucket = service.MoqBucket;
            mockBucket.Verify(u => u.BucketExistsAsync(It.Is<string>(x => x == "userexported"), It.IsAny<CancellationToken>()), Times.Once);
            mockBucket.Verify(u => u.MakeBucketAsync(It.Is<string>(x => x == "userexported"), It.IsAny<string>(),
                It.IsAny<CancellationToken>()), Times.Once);
            mockObject.Verify(u => u.PutObjectAsync(It.Is<string>(x => x == "userexported"), It.IsAny<string>(),
                It.IsAny<Stream>(), It.IsAny<long>(), It.IsAny<string>(), It.IsAny<Dictionary<string, string>>(),
                It.IsAny<ServerSideEncryption>(),
                It.IsAny<CancellationToken>()), Times.Once);

        }
    }
}
