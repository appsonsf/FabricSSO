const urls = {
    dbInfo: {
        loadAll: "/DbInfoManager?handler=AllDbInfo",             //载入所有的dbinfo信息
        update: "/DbInfoManager?handler=AddOrEditOrDelete",  //更新dbinfo的信息
        del: "/DbInfoManager?handler=AddOrEditOrDelete",  //删除一个dbinfo的信息
        add:"/DbInfoManager?handler=AddOrEditOrDelete"       //添加一个dbinfo的信息    
    },
    ingestJob: {
        loadAll: "/IngestJobsManager?handler=AllInstance",
        update: "/IngestJobsManager?handler=ActionInstance",
        del: "/IngestJobsManager?handler=ActionInstance",
        add:"/IngestJobsManager?handler=ActionInstance"
    },
    ingestInstance: {
        loadAll: "/InstanceManager?handler=AllInstance",
        update: "/InstanceManager?handler=ActionInstance",
        del: "/InstanceManager?handler=ActionInstance",
        add:"/InstanceManager?handler=ActionInstance"
    },
    schedulefullingest: {
        loadAll: "/ScheduleManager?handler=AllInstance",
        update: "/ScheduleManager?handler=ActionInstance",
        del: "/ScheduleManager?handler=ActionInstance",
        add:"/ScheduleManager?handler=ActionInstance"
    }
}

export default urls;