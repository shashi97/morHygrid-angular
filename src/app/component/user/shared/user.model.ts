export class UserModel {
    email: string = '';
    id: string = '';
    imagePath: string = ' ';
    imageSource: string = '';
    imageType: string = '';
    isNewImage: Boolean = false;
    password: string = '';
    userName: string = '';
    userCompanyModel: Array<UserCompanyModel>;
    roleID: number;
}

// export class ClientUser {
//     clientId: string = '';
//     clientName: string = '';
//     description: string = '';
//     isChecked: Boolean = false;
//     userID: string = '';
// }

export class UserCompanyModel {
    companyID: string = '';
    companyName: string = '';
    description: string = '';
    isChecked: Boolean = true;
    userCompanyID: string = '';
    userID: string = '';
}

export class ReportModel {
    companyID: string = ''
    companyName: string = ''
    description: string = ''
    userID: string = '';
    reports: Array<any> = [];
}
export class CompanyModel {
    CompanyID: string = ''
    companyName: string = ''
    Description: string = ''
    UserID: string = '';
    Reports: Array<any> = [];
}


