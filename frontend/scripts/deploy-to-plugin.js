/**
 * This script creates a build that can be used by the Shopware plugins.
 * It takes the following steps to achieve this.
 *
 * 1. The previous Angular build in the Shopware plugin views is replaced with the new build.
 * 2. The generated index.html is renamed to index.tpl.
 * 3. The new index.tpl file is loaded using Cheerio so we can manipulate the DOM.
 * 4. The PostMessage API used by LightWeight Shopware modules is appended to the body.
 * 5. The <base/> element is set to the plugin folder so that request to the plugin controllers are routed properly.
 * 5. All link and script tags are formatted so that Smarty can properly render them.
 * 6. Escaped quotation marks are restored.
 * 7. The index.tpl file is replaced with the modified one.
 */

// Everything you need to know about shelljs is here: https://devhints.io/shelljs, okay almost everything :p
const shell = require('shelljs');
const cheerio = require('cheerio');
const fs = require('fs');

function to_smarty_link(url) {
    return `{link file='${url}'}`;
}

//Set all necessary paths
const angular_root = shell.pwd();
const angular_dist_root = angular_root + '\\dist';
const shopware_plugin_root = angular_root + '\\..\\ShopwareAngularPlugin';
const shopware_plugin_view_path = shopware_plugin_root + '\\Resources\\views\\backend\\shopware_angular_plugin';
const shopware_plugin_index_html_path = shopware_plugin_view_path + '\\index.html';
const shopware_plugin_index_tpl_path = shopware_plugin_view_path + '\\index.tpl';

//Remove the previous build from the Shopware plugin view folder.
shell.rm('-rf', shopware_plugin_view_path + '\\**\\*');

//Copy the dist folder contents to the Shopware plugin view folder.
shell.cp('-rf', angular_dist_root + '\\**\\*', shopware_plugin_view_path);

//Copy the generated index.html in the Shopware plugin view folder and rename it to index.tpl.
shell.cp('-rf', shopware_plugin_index_html_path, shopware_plugin_index_tpl_path);

//Remove index.html from plugin view folder
shell.rm('-rf', shopware_plugin_index_html_path);

//Load the index.tpl template
const $ = cheerio.load(fs.readFileSync(shopware_plugin_index_tpl_path), {decodeEntities: true});

//Append PostMessage API to the body element.
//The need for this is explained in the Shopware Lightweight Backend Modules tutorial.
//Follow the link below to get there.
//https://developers.shopware.com/developers-guide/lightweight-backend-modules/
$('body').append('<script src="backend/base/frame/postmessage-api.js"></script>');

//Set base href.
//Shopware custom plugins need this to properly handle API requests.
$('base').attr('href', '/backend/AngularShopwarePlugin');
//Properly format link and script tags for smarty.
$('link').each(function (index, element) {
    let href = $(this).attr('href');
    $(this).attr('href', to_smarty_link(href));
});
$('script').each(function (index, element) {
    let src = $(this).attr('src');
    $(this).attr('src', to_smarty_link(src));
});

//Create HTML from the Cheerio object.
let index_tpl = $.html();

//At this point the quotes in the html have been escaped.
//In order to render the generated index.tpl properly we
//need to replace the html entities &quot; and &apos; with actual quotation marks.
index_tpl = index_tpl.replace(/&quot;/g, '"');
index_tpl = index_tpl.replace(/&apos;/g, '"');

//Write the index.tpl file to the Shopware plugin view folder
fs.writeFile(shopware_plugin_index_tpl_path, index_tpl, err => {
    console.log(err);
});
