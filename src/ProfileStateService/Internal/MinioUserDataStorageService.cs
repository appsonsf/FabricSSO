using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Minio;
using Sso.Remoting.Models;

namespace ProfileStateService.Internal
{
    public class MinioUserDataStorageService : IUserDataStorageService
    {
        private readonly MinioOption _minioOption;

        private const string bucketName = "userexported";
        private static bool bukeNameExist = false;
        private MinioClient _client = null;

        public MinioUserDataStorageService(MinioOption option)
        {
            _minioOption = option;
        }

        public async Task SaveUserDataAsync(UserDataFileDto file, Stream stream)
        {
            if (file == null)
                throw new ArgumentNullException(nameof(file));

            if (stream == null)
                throw new ArgumentNullException(nameof(stream));

            if (_minioOption == null)
                throw new Exception("Minio配置为空!");

            var bucketOperations = this.GetBucketOperations();
            var objectOperations = this.GetObjectOperations();
            try
            {
                if (!bukeNameExist)
                {
                    if (!await bucketOperations.BucketExistsAsync(bucketName))
                    {
                        await bucketOperations.MakeBucketAsync(bucketName);
                        bukeNameExist = true;
                    }
                }
                await objectOperations.PutObjectAsync(bucketName, file.FileName + ".csv", stream, stream.Length);
                ServiceEventSource.Current.Message("用户数据上传到Minio完成:{0}", file.FileName);
            }
            catch (Exception e)
            {
                ServiceEventSource.Current.Message("用户数据上传到Minio失败:{0},原因:", e.ToString());
            }
        }


        private MinioClient GetMinioClient()
        {
            if (this._client == null)
                this._client = new MinioClient(_minioOption.Endpoint, _minioOption.AccessKey, _minioOption.SecretKey);
            return _client;
        }

        //ps:虚方法是为了单元测试而使用的
        protected virtual IObjectOperations GetObjectOperations()
        {
            return this.GetMinioClient();
        }

        protected virtual IBucketOperations GetBucketOperations()
        {
            return this.GetMinioClient();
        }
    }
}
