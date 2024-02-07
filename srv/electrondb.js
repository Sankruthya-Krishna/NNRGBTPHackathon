const cds=require('@sap/cds')
module.exports = cds.service.impl(async function () {
    const { States, BusinessPartner } = this.entities;
    this.on("READ", BusinessPartner, async (req) => {
        const results = await cds.run(req.query);
        return results;
      });
    this.before("CREATE",  BusinessPartner, async (req) => {
        const { bp_no, Is_gstn_registered, Gst_num } = req.data;

        // Check if Is_gstn_registered is true and Gst_num is not provided
        if (Is_gstn_registered && !Gst_num) {
            req.error({
                code: "MISSING_GST_NUM",
                message: "GSTIN number is mandatory when Is_gstn_registered is true",
                target: "Gst_num",
            });
        }
        const query1 = SELECT.from( BusinessPartner).where({ bp_no: req.data.bp_no });
        const result = await cds.run(query1); // Execute the query using cds.run()
        if (result.length > 0) {
          req.error({
            code: "STEMAILEXISTS",
            message: " already exists",
            target: "bp_np",
          });
        }
        
      });
      this.on('READ',States,async(req)=>{
        genders=[
            {"code":"TS","description":"Telangana"},
            {"code":"AP","description":"Andra Pradesh"},
            {"code":"TN","description":"Tamil Nadu"},
        ]
        genders.$count=genders.length
        return genders;
    })
})