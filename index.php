<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<?php include 'head.php'; ?>

<body>

<div class="top-bar"></div>

<?php include 'nav.php'; ?>

<!-- top -->

<div class="card">
	<div class="intro"><h1 class="">We design and build digital tools of all shapes and sizes.</h1></div>
</div>


<!-- Facebook -->
<a name="work"></a>
<div class="card facebook card-work">
	<div class="card-home-text">
		<div class="divider"></div>
		<h2>We worked with Facebook to evolve their tools for advertisers.</h2>
		<p>Over the years, we've worked with Facebook to both create new products as well as improve existing products. We can't say more because this work is confidential.</p>
		<!-- <P><a href="#">Case study &#x2192;</a></p> -->
	</div>
	<div class="card-home-image">
		<img src="img/home-case-fb.png">
	</div>
</div>

<!-- Gmail -->

<div class="card gmail card-work">
	<div class="card-home-text">
		<div class="divider"></div>
		<h2>We helped Google design Gmail for iPhone and iPad.</h2>
		<p>Gmail needed an update on iOS in 2013, so we worked with Google to add new features and modernize the existing interface.</p>
		<!-- <P><a href="#">Case study &#x2192;</a></p> -->
	</div>
	<div class="card-home-image">
        <img src="img/static/google-gmail-static.png" class="mobile-only-img">
		<div class="card-home-image-left hide-for-mobile">
			<video  autoplay='autoplay' loop='loop'><source src="img/home-case-gmail-phone.mp4" type="video/mp4"></video>
			<img src="img/iPhone.png" />
		</div>
		<div class="hide-for-mobile card-home-image-right">
			<img src="img/home-case-gmail-tablet.png" />
		</div>
	</div>
</div>


<!-- Crew -->

<div class="card crew card-work">
	<div class="card-home-text">
		<div class="divider"></div>
		<h2>We helped Crew make team communication easy and fun.</h2>
		<p>Crew is a messaging service for deskless workers. We worked with the founders to design the product from the ground up on iOS, Android, and desktop.</p>
		<!-- <P><a href="#">Case study &#x2192;</a></p> -->
	</div>
	<div class="card-home-image">
        <img src="img/static/crew-static.png" class="mobile-only-img">
		<video class="hide-for-mobile" autoplay='autoplay' loop='loop'><source src="img/home-case-crew.mp4" type="video/mp4"></video>
	</div>
</div>

<!-- Diva -->

<div class="card diva card-work">
	<div class="card-home-text">
		<div class="divider"></div>
		<h2>We reimagined retail inventory tracking with Google.</h2>
		<p>This is the text that tells you about the project. Focus on high level things like the industry, core challenge, etc. Make it short and sweet.</p>
		<!-- <P><a href="#">Case study &#x2192;</a></p> -->
	</div>
	<div class="card-home-image">
        <img src="img/static/diva-static.png" class="mobile-only-img">
		<div class="card-home-image-left hide-for-mobile">
			<video autoplay='autoplay' loop='loop'><source src="img/home-case-diva-phone.mp4" type="video/mp4"></video>
			<img src="img/android.png" alt="">
		</div>
		<div class="card-home-image-right hide-for-mobile">
			<img src="img/home-case-diva-tablet.png" alt="">
		</div>

	</div>
</div>

<a name="contact"></a>
<footer>
    <div class="footer-left">

        <?php include 'contact-form.php'; ?>

    </div>
</footer>

<?php include 'foot.php'; ?>

</body>
</html>
