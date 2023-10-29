require("../model/databaseConnection");
const Product = require("../model/product");

exports.create = async(req, res)=>{
    try { 
        const product = new Product({
          name: req.body.name,
          price:req.body.price,
          details: req.body.details,
          category:req.body.category
        });
        await product.save();
        return res.status(201).json(product); 
    
      } catch (error) {
          console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

}
exports.product = async(req,res) =>{
    try{
    const id= req.params.id;
    const product =  await Product.findById(id);
    return res.status(201).json(product);   
}catch(error){
    console.log(error);
}
}

exports.products = async(req,res) =>{
    const products = await Product.find({});
    return res.status(201).json(products);
  
}
u=
exports.update = async(req,res)=>{
   try{
    let id = req.params.id
	const product = await Product.updateOne({_id:id},{
        name: req.body.name,   
        price: req.body.price,   
        details: req.body.details,
        category: req.body.category,      
    })
    return res.status(201).json(product);

   }catch(error){
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
   }
}

exports.delete = async(req,res)=>{
    try{
        let id = req.params.id 
        const product =await Product.deleteOne({_id:id})   
        return res.status(200).json({ message: 'product deleted' });
 
    }catch(error){
     console.error(error);
     return res.status(500).json({ error: 'Internal Server Error' });
    }
 }