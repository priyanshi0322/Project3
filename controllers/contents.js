const Content = require("../models/content");

module.exports.index = async (req, res) => {
    const allContent = await Content.find({});
    res.render("content/index.ejs", {allContent});
};

module.exports.renderNewForm = (req, res) => {
    res.render("content/new.ejs");
};

module.exports.showContent = async (req, res) => {
    let { id } = req.params;
    const content = await Content.findById(id).populate({ path: "review", populate: { path: "author",},}).populate("owner");  
    if(!content) {
        req.flash("error", "Content you requested does not exit");  
        res.redirect("/content");
    }
    console.log(content);
    res.render("content/show.ejs", { content });
};

module.exports.createContent = async(req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url, "..", filename);
    const newContent = new Content(req.body.content);
    newContent.owner = req.user._id;
    newContent.image = { url, filename };
    await newContent.save();
    req.flash("success", "New content created");
    res.redirect("/content");
};

module.exports.renderEditForm = async (req, res) => {
    let{id} = req.params;
    let content = await Content.findById(id);
    if(!content) {
        req.flash("error", "Content you requested does not exit");  
        res.redirect("/content");
    }
    let originalImageUrl = content.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300");
    res.render("content/edit.ejs", { content, originalImageUrl });
};

module.exports.updateContent = async(req, res) => {
    let { id } = req.params;
    let content = await Content.findByIdAndUpdate(id, { ...req.body.content });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        content.image = { url, filename };
        await content.save();
    }
    req.flash("success", "Content Updated"); 
    res.redirect(`/content/${id} `);
};

module.exports.destoryContent = async(req, res) => {
    let { id } = req.params;
    let deletedContent = await Content.findByIdAndDelete(id, { ...req.body.content });
    console.log(deletedContent);
    req.flash("success", "Content deleted");
    res.redirect("/content");
};