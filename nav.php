<?php

$url = $_SERVER['REQUEST_URI'];
$isStudio = preg_match('/studio/', $url);
$isContact = preg_match('/contact/', $url);

?>

<nav>
    <div class="logo"><span>O/M</span></div>
    <div class="subnav">
        <a href="studio.php" class="<?php $isStudio && print 'selected'; ?>">Studio</a> &nbsp; &nbsp; &nbsp;
        <a href="contact.php" class="<?php $isContact && print 'selected'; ?>">Contact</a></div>
</nav>
