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
      autosearch:{
        controllerName:"/api/v1/search_animal/",
        actionName:"AUTOSEARCH",
        requestMethod: RequestMethod.GET
      },
      category:{
        controllerName:"/api/v1/get_breed_with_category/",
        actionName:"CATEGORY",
        requestMethod: RequestMethod.GET
      },
      district:{
        controllerName:"/api/v1/all_district/",
        actionName:"DISTRICT",
        requestMethod: RequestMethod.GET
      },
      categoryList:{
        controllerName:"/api/v1/all_category/",
        actionName:"CATEGORYLIST",
        requestMethod: RequestMethod.GET
      },
      MuniciapilityList:{
        controllerName:"/v1/get_municipality/",
        actionName:"MUNICIAPILITYLIST",
        requestMethod: RequestMethod.GET
      }

    },
    
}

type ApiList = typeof apiDetails;
export const apiList: ApiList = apiDetails;