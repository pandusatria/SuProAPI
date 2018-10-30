'use strict';

function model (entity)
{
    this._id             =   entity._id;
    this.ProductName     =   entity.ProductName;
    this.SupplierID      =   entity.SupplierID;
    this.CategoryName    =   entity.CategoryName;
    this.QuantityPerUnit =   entity.QuantityPerUnit;
    this.UnitPrice       =   entity.UnitPrice;
    this.UnitInStock     =   entity.UnitInStock;
    this.IsDelete        =   entity.IsDelete;
    this.CreatedDate     =   entity.CreatedDate;
    this.CreatedBy       =   entity.CreatedBy;
    this.UpdateDate      =   entity.UpdateDate;
    this.UpdateBy        =   entity.UpdateBy;
}

model.prototype.getData = function()
{
    return {
        _id          :   this._id,
        ProductName  :   this.ProductName,
        SupplierID   :   this.SupplierID,
        CategoryName :   this.CategoryName,
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