namespace com.test.sdb;
using {cuid} from '@sap/cds/common';
@assert.unique:{
    bp_no:[bp_no]
}
entity BusinessPartner : cuid {
    bp_no:String(6);
    @title:'Name'
    name:String(20);
 @title:'Address 1'
    add1:String(70);
 @title:'Address 2'
    add2:String(70);
    @title:'City'
    city:String(20);
     @title:'State'
    state:Association to States;
     @title:'pin code'
    pinCode:String(10);
    @title:' Is_gstn_registered'
     Is_gstn_registered:Boolean default false;
       @title:' GSTIN number'
     Gst_num:String(20);
       @title:' is vendor'
    Is_vendor:Boolean default false;
      @title:' is customer'
    Is_customer:Boolean default false;
}
@cds.persistence.skip
entity States {
    @title:'code'
    key code: String(3);
    @title:'description'
    description:String(10);
    
}