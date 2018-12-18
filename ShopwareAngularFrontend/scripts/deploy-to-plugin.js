// Everything you need to know about shelljs is here: https://devhints.io/shelljs
const shell = require('shelljs');
const cheerio = require('cheerio');
const fs = require('fs');

//Helper functions
function get_resource_name(resource_path) {
    const parts = resource_path.split('/');
    return parts[parts.length - 1];
}

function to_smarty_link(url) {
    return `{link file='${url}'}`;
}

//Set required paths
const angular_root = shell.pwd();
const angular_dist_root = angular_root + '\\dist';
const shopware_plugin_root = angular_root + '\\..\\ShopwareAngularPlugin';
const shopware_plugin_view_path = shopware_plugin_root + '\\Resources\\views\\backend\\shopware_angular_plugin';
const shopware_plugin_index_html_path = shopware_plugin_view_path + '\\index.html';
const shopware_plugin_index_tpl_path = shopware_plugin_view_path + '\\index.tpl';

//Clear previous build
shell.rm('-rf', shopware_plugin_view_path + '\\**\\*');

//Copy dist folder contents to plugin view folder
shell.cp('-rf', angular_dist_root + '\\**\\*', shopware_plugin_view_path);

//Create index.tpl in plugin view folder
shell.cp('-rf', shopware_plugin_index_html_path, shopware_plugin_index_tpl_path);

//Remove index.html from plugin view folder
shell.rm('-rf', shopware_plugin_index_html_path);

//Adjust link and script tags to smarty syntax
const $ = cheerio.load(fs.readFileSync(shopware_plugin_index_tpl_path), {decodeEntities: true});

//Append PostMessage API
$('body').append('<script src="backend/base/frame/postmessage-api.js"></script>');

//Set base href
$('base').attr('href', '/backend/AngularShopwarePlugin');
//Format link and script tages so that smarty can
$('link').each(function (index, element) {
    let href = $(this).attr('href');
    $(this).attr('href', to_smarty_link(href));
});
$('script').each(function (index, element) {
    let src = $(this).attr('src');
    $(this).attr('src', to_smarty_link(src));
});

//First replace &quot; en then replace &apos;
let index_tpl = $.html();
index_tpl = index_tpl.replace(/&quot;/g, '"');
index_tpl = index_tpl.replace(/&apos;/g, '"');

fs.writeFile(shopware_plugin_index_tpl_path, index_tpl, err => {
    console.log(err);
});
