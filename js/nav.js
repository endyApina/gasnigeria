const logout = () => {
    localStorage.removeItem("user_data")
    location.href="login.html"
}


var signInText = `
    <li><a href="login.html">Sign in</a></li>
    <li><a href="register.html">Register</a></li>
`;


if (JSON.parse(localStorage.getItem('user_data'))) {
    const savedUserData = JSON.parse(localStorage.getItem('user_data'))
    if (savedUserData.user_data) {
        signInText = `
            <li><a href="#" onclick="logout();" id="signout_nav_btn">Log Out</a></li>
            <li><a href="account.html">My Account</a></li>
        `
    }
}

const subNav = `
<div class="ltn__drop-menu user-menu">
    <ul>
        <li>
            <a href="#"><i class="icon-user"></i></a>
            <ul>
                <li><a href="cart.html">My Cart</a></li>
                ${signInText}
            </ul>
        </li>
    </ul>
</div>
`;

const headerNav = `
<div class="ltn__header-middle-area ltn__header-sticky ltn__sticky-bg-black plr--9---">
<div class="container">
    <div class="row">
        <div class="col">
            <div class="site-logo-wrap">
                <div class="site-logo">
                    <a href="index.html"><img src="gasimg/gastogologo.png" alt="Logo"></a>
                </div>
            </div>
        </div>
        <div class="col header-menu-column menu-color-white">
            <div class="header-menu d-none d-xl-block">
                <nav>
                    <div class="ltn__main-menu">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="shop.html">Store</a></li>
                            <li><a href="account.html">Orders</a></li>
                            <li><a href="contact.html">Bulk Order</a></li>
                            <li class="special-link"><a href="shop.html">ORDER NOW</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
        <div class="ltn__header-options ltn__header-options-2">
            <!-- user-menu -->
            ${subNav}
            <!-- header-search-1 -->
            <!-- Mobile Menu Button -->
            <div class="mobile-menu-toggle d-xl-none">
                <a href="#ltn__utilize-mobile-menu" class="ltn__utilize-toggle">
                    <svg viewBox="0 0 800 600">
                        <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" id="top"></path>
                        <path d="M300,320 L540,320" id="middle"></path>
                        <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" id="bottom" transform="translate(480, 320) scale(1, -1) translate(-480, -318) "></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>
</div>
`

const mobileNav = `
<div id="ltn__utilize-mobile-menu" class="ltn__utilize ltn__utilize-mobile-menu">
    <div class="ltn__utilize-menu-inner ltn__scrollbar">
        <div class="ltn__utilize-menu-head">
            <div class="site-logo">
                <a href="index.html"><img src="gasimg/gastogologo.png" alt="Logo"></a>
            </div>
            <button class="ltn__utilize-close">×</button>
        </div>
        <div class="ltn__utilize-menu">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="shop.html">Store</a></li>
                <li><a href="account.html">Orders</a></li>
                <li><a href="contact.html">Bulk Order</a></li>
            </ul>
        </div>
        <div class="ltn__utilize-buttons ltn__utilize-buttons-2">
            <ul>
                <li>
                    <a href="account.html" title="My Account">
                        <span class="utilize-btn-icon">
                            <i class="far fa-user"></i>
                        </span>
                        My Account
                    </a>
                </li>
            </ul>
        </div>
        <div class="ltn__social-media-2">
            <ul>
                <li><a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a></li>
                <li><a href="#" title="Twitter"><i class="fab fa-twitter"></i></a></li>
                <li><a href="#" title="Linkedin"><i class="fab fa-linkedin"></i></a></li>
                <li><a href="#" title="Instagram"><i class="fab fa-instagram"></i></a></li>
            </ul>
        </div>
    </div>
</div>
`;