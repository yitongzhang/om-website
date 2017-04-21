<div class="submit-success">
    <div class="submit-success-msg">Thanks for reaching out! We'll get back to you soon.</div>
    <a href class="submit-success-dismiss">Back to form</a>
</div>

<form id="contactForm" class="contact-form">

    <h2>How can we help you?</h2>

    <input type="text" name="Name" id="Name" placeholder="Your name" class="form-control">
    <input type="email" name="Email" id="Email" placeholder="Email address" class="form-control">
    <input type="text" name="Company" id="Company" placeholder="Company" class="form-control">
    <input type="hidden" name="_next" value="thanks.html">

            <textarea maxlength="150" name="Description" id="Description" placeholder="Tell us about your project"
                      cols="30" rows="1" class="form-control"></textarea>

    <div class="form-group submit">
        <input type="hidden" name="submit" value="1">
        <button type="submit" class="sbtn" name="submit" value="1" data-content="Submit" value="Send Form">
            <span data-content="Send">Send</span>
        </button>
    </div>

    <div class="form-error-message"></div>

</form>
