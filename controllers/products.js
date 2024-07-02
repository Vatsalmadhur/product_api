const Product = require("../models/product")
const getAllProducts= async (req,res)=>{

    const {company,name,featured,sort,select} = req.query;
    const queryObj={};
    if(company){
        queryObj.company=company;
    }
    if(name){
        queryObj.name={$regex:name,$options:"i"};
    }
    if(featured){
        queryObj.featured=featured;
    }
    console.log(queryObj)

    let apiData=Product.find(queryObj);
    //dorting functionality
     if(sort){
        let sortFix = sort.replace(","," ");
        apiData= apiData.sort(sortFix);
     }
     //select functionality
     if(select){
        let selectFix = select.split(",").join(" ");
        apiData= apiData.select(selectFix);
     }

        //pagination
    let page=Number(req.query.page) || 1;
    let limit = Number(req.query.limit) ||10;
    let skip =(page-1)*limit;
    apiData=apiData.skip(skip).limit(limit);

    const data = await apiData;
    res.status(200).json({data})
}

const getAllProductsTesting= async (req,res)=>{
    const data = await Product.find(req.query).sort("-price")
    res.status(200).json({data})
}

module.exports = { getAllProducts,getAllProductsTesting};