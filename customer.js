class Customer{
    constructor(CustomerID, FirstName, MiddleName, LastName, EmailAddress, Phone, NameStyle, Title, Suffix, CompanyName, SalesPerson, PasswordHash, PasswordSalt, rowguid, ModifiedDate){
        this.CustomerID = CustomerID;
        this.FirstName = FirstName;
        this.MiddleName = MiddleName
        this.LastName = LastName;
        this.EmailAddress = EmailAddress;
        this.Phone = Phone;
        this.NameStyle = NameStyle;
        this.Title = Title;
        this.Suffix = Suffix;
        this.CompanyName = CompanyName;
        this.SalesPerson = SalesPerson;
        this.PasswordHash = PasswordHash;
        this.PasswordSalt = PasswordSalt;
        this.rowguid = rowguid;
        this.ModifiedDate = ModifiedDate;
    };
};
module.exports = Customer;
