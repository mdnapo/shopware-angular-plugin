// Everything you need to know about shelljs is here: https://devhints.io/shelljs, okay almost everything :p
const shell = require('shelljs');
const cheerio = require('cheerio');
const fs = require('fs');

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

//Load index.tpl
const $ = cheerio.load(fs.readFileSync(shopware_plugin_index_tpl_path), {decodeEntities: true});

//Append PostMessage API
//The need for this tag is explained further in the Lightweight Backend Modules tutorial on the Shopware dev site.
//https://developers.shopware.com/developers-guide/lightweight-backend-modules/#search-results
$('body').append('<script src="backend/base/frame/postmessage-api.js"></script>');

//Set base href
$('base').attr('href', '/backend/AngularShopwarePlugin');
//Format link and script tags so that smarty can
$('link').each(function (index, element) {
    let href = $(this).attr('href');
    $(this).attr('href', to_smarty_link(href));
});
$('script').each(function (index, element) {
    let src = $(this).attr('src');
    $(this).attr('src', to_smarty_link(src));
});

//First replace &quot; en then replace &apos; in de
let index_tpl = $.html();
index_tpl = index_tpl.replace(/&quot;/g, '"');
index_tpl = index_tpl.replace(/&apos;/g, '"');

//Write to the index.tpl
fs.writeFile(shopware_plugin_index_tpl_path, index_tpl, err => {
    console.log(err);
});
