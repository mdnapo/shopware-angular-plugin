<?php

// This is where you specify files that should be excluded from the plugin zip
const IGNORED_FILES = [
    '.git', '.gitignore',
    'composer.json', 'composer.lock',
    'generate_zip.php',
];

// Set necessary directory paths and plugin name
$plugin_dir = realpath(__DIR__);
$target_dir = realpath(__DIR__ . '/../build');
$path_parts = explode(DIRECTORY_SEPARATOR, $plugin_dir);
$plugin_name = $path_parts[count($path_parts) - 1];
$tmp_dir = "{$target_dir}/{$plugin_name}Temp";

// Copy the contents of $plugin_dir to $tmp_dir
copy_dir_recursive($plugin_dir, $tmp_dir);
// Remove files specified in IGNORED_FILES from $tmp_dir
clean_up_dir($tmp_dir, IGNORED_FILES);

// Set zip location
$plugin_xml = new SimpleXMLElement(file_get_contents("$plugin_dir/plugin.xml"));
$zip_name = "$plugin_name-$plugin_xml->version.zip";
$zip_dir = "$target_dir/$zip_name";

/**
 * Make sure to replace any back slashes with forward slashes in the $zip_dir path.
 * This will make sure that the zip is valid on all platforms, otherwise you might
 * encounter weird problems like existing classes not being found due to a wrong
 * file path format.
 */
$zip_dir = str_replace(DIRECTORY_SEPARATOR, '/', $zip_dir);

// Initialize a ZipArchive object with $zip_dir
$zip = new ZipArchive();
$zip->open($zip_dir, ZipArchive::CREATE | ZipArchive::OVERWRITE);

// Create recursive directory iterator for $tmp_dir
/** @var SplFileInfo[] $files */
$files = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($tmp_dir),
    RecursiveIteratorIterator::LEAVES_ONLY
);

//Add files to zip
foreach ($files as $name => $file) {
    // Skip directories (they would be added automatically)
    if (!$file->isDir()) {
        // Get $real_path, relative and zip path for current file
        $real_path = $file->getRealPath();
        $relative_path = substr($real_path, strlen($tmp_dir) + 1);
        $zip_path = "$plugin_name/$relative_path";

        // $zip_path can contain backward slashes, read explanation on line 33,
        $zip_path = str_replace(DIRECTORY_SEPARATOR, '/', $zip_path);
        // Add current file to archive
        $zip->addFile($real_path, $zip_path);
    }
}

// Zip archive will be created only after closing object
$zip->close();

// Remove temporary directory
remove_dir_recursive($tmp_dir);

// Notify user of the successful zip generation!
echo "Plugin zip created at $zip_dir.\r\n";


// Helper function declarations
function copy_dir_recursive($src, $dst, $permissions = 0755)
{
    // Check for symlinks
    if (is_link($src)) {
        return symlink(readlink($src), $dst);
    }

    // Simple copy for a file
    if (is_file($src)) {
        return copy($src, $dst);
    }

    // Make destination directory
    if (!is_dir($dst)) {
        mkdir($dst, $permissions);
    }

    // Loop through the folder
    $dir = dir($src);
    while (false !== $entry = $dir->read()) {
        // Skip pointers
        if ($entry == '.' || $entry == '..') {
            continue;
        }

        // Deep copy directories
        copy_dir_recursive("$src/$entry", "$dst/$entry", $permissions);
    }

    // Clean up
    $dir->close();
    return true;
}

function clean_up_dir($path, array $files_to_remove)
{
    foreach ($files_to_remove as $file) {
        $full_path = "$path/$file";
        if (file_exists($full_path)) {
            if (is_dir($full_path)) {
                remove_dir_recursive($full_path);
            } else unlink($full_path);
        }
    }
}

function remove_dir_recursive($path)
{
    $files = array_diff(scandir($path), ['.', '..']);

    foreach ($files as $file) {
        $file_path = "$path/$file";
        is_dir($file_path) ? remove_dir_recursive($file_path) : unlink($file_path);
    }

    rmdir($path);
    return;
}
