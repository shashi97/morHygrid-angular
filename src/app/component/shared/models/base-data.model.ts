
export class BaseDataModel<T> {
  Data: T[] = new Array<T>();
  TotalRecords = 0;
}

export class BaseResponseModel<T> {
  successful: boolean;

}

export class ObjectModel<T> {
  StatusDesc: string;
  Status: boolean;
  HasError: boolean;
  ErrorMessage: any;
  Result: T = {} as T;

}
export class ArrayModel<T> {
  StatusDesc: string;
  Status: boolean;
  HasError: boolean;
  ErrorMessage: any;
  Result: T[] = new Array<T>();

}

export class ArrayResponseModel<T> extends BaseResponseModel<T> {
  data: ArrayModel<T> = new ArrayModel<T>();
  constructor() {
    super();
  }
}
export class ObjectResponseModel<T> extends BaseResponseModel<T> {
  data: ObjectModel<T> = new ObjectModel<T>();
  constructor() {
    super();
  }
}

export class PostObjectResponseModel<T> extends ObjectResponseModel<T> {
  ValidatonResult: ValidationResult = new ValidationResult();
  constructor() {
    super();
  }
}


export class ValidationResult {
  validationErrors: ValidationErrors[] = new Array<ValidationErrors>();
}

export class ValidationErrors {
  errorMessage = '';
  memberNames: string[] = new Array<string>();
  errorCode = 0;
}




export class PromiseHandler<T> extends Promise<BaseResponseModel<T>>  {
  constructor(promise: Promise<any>) {
    super((resolve, reject) => {
      if (!promise) { return; }
      promise.then(res => {
        const returnValue: BaseResponseModel<T> = {} as BaseResponseModel<T>;

        if (res.status === 200) {
          const data = res.json() ;

          if (data) {
            (returnValue as ArrayResponseModel<T>).data = data;
          } else {
            const dataObject = res.json() ;
            // if (dataObject) {
            (returnValue as ObjectResponseModel<T>).data = dataObject;
            // }
          }
          returnValue.successful = true;
          resolve(returnValue);
        }

        if (res.status !== 200) {
          returnValue.successful = res.status;
          returnValue.successful = (res as any)._body;
          try {
            const validationResult = res.json() as ValidationResult;
            if (validationResult) {
              (returnValue as PostObjectResponseModel<T>).ValidatonResult = validationResult;
            }
          } catch (ex) {

          }
          reject(returnValue);
        }

      })
      promise.catch(err => {
        const returnValue: PostObjectResponseModel<T> = new PostObjectResponseModel<T>();
        returnValue.successful = err.status;
        returnValue.successful = (err as any)._body;
        try {
          const validationResult = err.json() as ValidationResult;
          if (validationResult) {
            (returnValue as PostObjectResponseModel<T>).ValidatonResult = validationResult;
          }
        } catch (ex) {

        }
        reject(returnValue);
      })
    })
  }
}

export class DeletePromiseHandler<T> extends Promise<BaseResponseModel<T>>  {
  constructor(promise: Promise<any>) {
    super((resolve, reject) => {
      if (!promise) { return; }
      promise.then(res => {
        const returnValue: BaseResponseModel<T> = {} as BaseResponseModel<T>;

        if (res.status === 200) {
          const data = res as T[];
          if (data) {
            (returnValue as ArrayResponseModel<T>).data.Result = data;
          } else {
            const dataObject = res.json() as T;
            if (dataObject) {
              (returnValue as ObjectResponseModel<T>).data.Result = dataObject;
            }
          }
          returnValue.successful = true;
          resolve(returnValue);
        }

        if (res.status !== 200) {
          returnValue.successful = res.status;
          returnValue.successful = (res as any)._body;
          try {
            const validationResult = res.json() as ValidationResult;
            if (validationResult) {
              (returnValue as PostObjectResponseModel<T>).ValidatonResult = validationResult;
            }
          } catch (ex) {

          }
          reject(returnValue);
        }

      })
      promise.catch(err => {
        const returnValue: PostObjectResponseModel<T> = new PostObjectResponseModel<T>();
        returnValue.successful = err.status;
        returnValue.successful = (err as any)._body;
        try {
          const validationResult = err.json() as ValidationResult;
          if (validationResult) {
            (returnValue as PostObjectResponseModel<T>).ValidatonResult = validationResult;
          }
        } catch (ex) {

        }
        reject(returnValue);
      })
    })
  }
}
