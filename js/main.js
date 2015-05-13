/**
 * Variables to store references to page elements.
 */
var navbar = document.getElementById('navbar');
var works_outer = document.getElementById('works-outer');
var about_outer = document.getElementById('about-outer');
var brand = document.getElementById('brand');
var works_button = document.getElementById('works-button');
var about_button = document.getElementById('about-button');

// Empty textarea. For some reason some white space is inserted into textarea
// on page load...
//document.getElementById('name').value = '';
//document.getElementById('email').value = '';
//document.getElementById('message').value = '';

/**
 * Run after page finished rendering.
 */
window.onload = function() {
}

/**
 * Function to change link colors. Should be passed link to be altered.
 */
function selectLink(link) {
    var selected = document.getElementsByClassName('selected')[0];
    if (selected != undefined) {
        selected.classList.remove('selected');
    }
    link.classList.add('selected');
}

/**
 * Delay duration for scrolling and link hightligting.
 */
var wait = 500;

/**
 * Click event handler for brand navbar link. Will scroll to top of page.
 */
brand.addEventListener('click', function(event) {
    // Prevent default link click behaviour.
    event.preventDefault();
    $('html, body').stop().animate({
        scrollTop: 0
    }, wait);
}, false);

/**
 * Click event handler for 'works' navbar link.
 */
works_button.addEventListener('click', function(event) {
    // Prevent default link click behaviour.
    event.preventDefault();
    $('html, body').stop().animate({
        scrollTop: works_outer.offsetTop - navbar.offsetHeight + 1
    }, wait);
}, false);

/**
 * Click event handler for 'about' navbar link.
 */
about_button.addEventListener('click', function(event) {
    // Prevent default link click behaviour.
    event.preventDefault();
    $('html, body').stop().animate({
        scrollTop: about_outer.offsetTop - navbar.offsetHeight + 1
    }, wait);
}, false);

/**
 * Handle scroll event for window. When scrolled past certain points
 * the appropriate navbar link will become selected. Still needs some tweaking.
 */
window.addEventListener('scroll', function(event){
    var scroll_position = (window.pageYOffset || 
            document.documentElement.scrollTop) + navbar.offsetHeight;
    if (scroll_position < works_outer.offsetTop) {
        selectLink(brand);
    } else if (scroll_position >= works_outer.offsetTop &&
            scroll_position < about_outer.offsetTop) {
        selectLink(works_button);
    } else if (scroll_position >= about_outer.offsetTop) { 
        selectLink(about_button);
    }
}, false);

/**
 * Helper functions to add and remove iframe.
 */
function addIframe() {
    var iframe = document.createElement('iframe');
    iframe.id = 'form-iframe';
    //iframe.classList.add('embed-responsive-item');
    iframe.setAttribute('src', 'http://contact.colinshaw.org');
    var p = document.createElement('p');
    p.innerHTML = 'Your browser does not support iframes.';
    iframe.appendChild(p);
    document.getElementById('contact-info').appendChild(iframe);
}

function removeIframe () {
    document.getElementById('form-iframe').remove();
}

/**
 * Adds iframe to contact-info and hides contact-button when clicked.
 */
var cb = document.getElementById('contact-button');
cb.addEventListener('click', function(event) {
    // Only create new iframe if one doesn't exist yet.
    if (document.getElementById('form-iframe') == undefined) {
        addIframe();
    }
    document.getElementById('contact-info').classList.remove('hide');
}, false);
