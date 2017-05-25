<?php

$url = $_SERVER['REQUEST_URI'];

$isStudio = preg_match('/studio/', $url);
$isContact = preg_match('/contact/', $url);
$isHome = !$isStudio && !$isContact;

?>

<nav>
    <div class="logo"><a href="/"><span class="<?php $isHome && print 'selected'; ?>">O/M</span></a></div>
    <div class="subnav">
        <a href="studio.php"><span class="<?php $isStudio && print 'selected'; ?>">Studio</span></a> &nbsp; &nbsp; &nbsp;
        <a href="contact.php"><span class="<?php $isContact && print 'selected'; ?>">Contact</span></a></div>
</nav>
