'use strict';

function model (entity)
{
    this._id            =   entity._id;
    this.CompanyName    =   entity.CompanyName;
    this.ContactName    =   entity.ContactName;
    this.ContactEmail   =   entity.ContactEmail;
    this.ContactTitle   =   entity.ContactTitle;
    this.Address        =   entity.Address;
    this.City           =   entity.City;
    this.PostalCode     =   entity.PostalCode;
    this.Country        =   entity.Country;
    this.Phone          =   entity.Phone;
    this.Fax            =   entity.Fax;
    this.IsDelete       =   entity.IsDelete;
    this.CreatedDate    =   entity.CreatedDate;
    this.CreatedBy      =   entity.CreatedBy;
    this.UpdateDate     =   entity.UpdateDate;
    this.UpdateBy       =   entity.UpdateBy;
}

model.prototype.getData = function()
{
    return {
        _id          :   this._id,
        CompanyName  :   this.CompanyName,
        ContactName  :   this.ContactName,
        ContactEmail :   this.ContactEmail,
        ContactTitle :   this.ContactTitle,
        Address      :   this.Address,
        City         :   this.City,
        PostalCode   :   this.PostalCode,
        Country      :   this.Country,
        Phone        :   this.Phone,
        Fax          :   this.Fax,
        IsDelete     :   this.IsDelete,
        CreatedDate  :   this.CreatedDate,
        CreatedBy    :   this.CreatedBy,
        UpdateDate   :   this.UpdateDate,
        UpdateBy     :   this.UpdateBy
    };
};

module.exports = model;