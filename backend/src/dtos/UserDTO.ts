export class UserDTO {
    
    id: number;
    email: string
    firstName: string
    lastName: string
    phoneNumber: number
    userType: String;

    constructor(email: string, firstName: string, lastName: string,
        phoneNumber: number, userType: string, id?: number) {
            this.id = id;
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.phoneNumber = phoneNumber;
            this.userType = userType;
    }
}
