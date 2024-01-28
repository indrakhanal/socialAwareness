export enum RequestMethod {
    GET = "GET",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    PURGE = "PURGE",
    LINK = "LINK",
    UNLINK = "UNLINK",
  }
  
  export enum RequestBodyType {
    /**If request id in application/x-www-form-urlencoded as string*/
    QUERYSTRING = "QUERY-STRING",
    /**If request is in formdata*/
    FORMDATA = "FORM-DATA",
    /**If request requires Bearer*/
    AUTH = "AUTH",
    /**If request is open*/
    NOAUTH = "NO-AUTH",
  }

  export interface apiDetailType {
    /**Redux Action Name */
    actionName: string;
    /**Request API URI */
    controllerName: string;
    /**Request Method; Defaults as GET */
    requestMethod?: RequestMethod;
    /**Request Body Type */
    requestBodyType?: RequestBodyType;
  }


  const apiDetails = {
    local: {
      i18n: {
        controllerName: "",
        actionName: "I18N"
      },
    },
    oauth: {
      login: {
        controllerName: "api/login/",
        actionName: "LOGIN",
        requestMethod: RequestMethod.POST,
        requestBodyType: RequestBodyType.NOAUTH
      },
      register: {
        controllerName: "/api/register/",
        actionName: "REGISTER",
        requestMethod: RequestMethod.POST,
        requestBodyType: RequestBodyType.NOAUTH
      },
      init: {
        controllerName: "/oauth/user/init/data",
        actionName: "INIT",
        requestMethod: RequestMethod.GET
      },
      userDetails:{
        controllerName:"/api/user/detail/",
        actionName:"DETAILS",
        requestMethod: RequestMethod.GET
      },
      cause:{
        controllerName:"/api/main/cause/",
        actionName:"CAUSE",
        requestMethod: RequestMethod.POST
      },
      updateCause:{
        controllerName:"/api/main/cause/{id}/",
        actionName:"UPDATECAUSE",
        requestMethod: RequestMethod.PUT
      },
      business:{
        controllerName:"/api/main/business/",
        actionName:"BUSINESS",
        requestMethod: RequestMethod.POST
      },
      updateBusiness:{
        controllerName:"/api/main/business/{id}/",
        actionName:"UPDATEBUSINESS",
        requestMethod: RequestMethod.PUT
      },
      homepageData:{
        controllerName:"/api/user/alldata/",
        actionName:"HOMEPAGEDATA",
        requestMethod: RequestMethod.GET
      },
      getCauseById:{
        controllerName:"/api/main/cause/{id}/",
        actionName:"GETCAUSE",
        requestMethod: RequestMethod.GET
      },
      getBusinessById:{
        controllerName:"/api/main/business/{id}/",
        actionName:"GETBUSINESS",
        requestMethod: RequestMethod.GET
      },
      deleteBusiness:{
        controllerName:"/api/main/business/{id}/",
        actionName:"DELETEBUSINESS",
        requestMethod: RequestMethod.DELETE
      },
      deleteCause:{
        controllerName:"/api/main/cause/{id}/",
        actionName:"DELETEBUSINESS",
        requestMethod: RequestMethod.DELETE
      },
      createCauseJoin:{
        controllerName:"/api/user/create_participation/{id}/",
        actionName:"CREATECAUSEJOIN",
        requestMethod: RequestMethod.POST
      },
      deleteParticipations:{
        controllerName:"/api/main/participation/{id}/",
        actionName:"DELETEPARTICIPATION",
        requestMethod: RequestMethod.DELETE
      }
    },
    
}

type ApiList = typeof apiDetails;
export const apiList: ApiList = apiDetails;