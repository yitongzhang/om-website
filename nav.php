<?php

$url = $_SERVER['REQUEST_URI'];

$isJobs = preg_match('/jobs/', $url);
$isStudio = preg_match('/studio/', $url);
$isContact = preg_match('/contact/', $url);
$isHome = !$isStudio && !$isContact;

?>

<nav class="">
    <div class="logo"><a href="/">
    	<span class=""><img src="img/om-logo-disc.svg"></span></a>
    </div>
    <div class="subnav">
        <a href="studio.php"><span class="<?php $isStudio && print 'selected'; ?>">Studio</span></a> &nbsp; &nbsp; &nbsp;
        <a href="jobs.php"><span class="<?php $isJobs && print 'selected'; ?>">Jobs</span></a> &nbsp; &nbsp; &nbsp;
        <a href="#footer"><span class="">Contact</span></a></div>
</nav>
