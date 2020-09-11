import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
	return (

		<div className="container">
			<MDBFooter color="blue" className="font-small pt-5 mt-6 footer-con">
				<MDBContainer fluid className="text-center text-md-left">
					<MDBRow>
						<MDBCol md="2">
							<div className="desktop-genericInfo">
								<div className="desktop-shopLinks">
									<p className="desktop-gInfoTitle">
										<a href="/"> ONLINE SHOPPING </a>
									</p>
									<a href="/Men">Men</a>
									<a href="/Men"> Women</a>
									<a href="/Men"> Kids </a>
									<a href="/Men">Home &amp; Living</a>
									<a href="/Men"> Discover	</a>
									<a href="/Men">Gift Cards</a>
									<a href="/Men">
										<span className="desktop-superscript"> New </span>
									</a>
								</div>
							</div>
						</MDBCol>
						<MDBCol md="1"></MDBCol>
						<MDBCol md="1">
							<div className="desktop-genericInfo">
								<div className="desktop-shopLinks">
									<p className="desktop-gInfoTitle"> USEFUL LINKS </p>
									<a href="/">Contact Us	</a>
									<a href="/Men">FAQ</a>
									<a href="/Men">T&amp;C</a>
									<a href="/">Terms Of Use	</a>
									<a href="/order/buy">Track Orders</a>
								</div>
							</div>
						</MDBCol>
						<MDBCol md="1"></MDBCol>
						<MDBCol md="1">
							<div className="desktop-genericInfo">
								<div className="desktop-shopLinks">
									<p className="desktop-gInfoTitle"> USEFUL LINKS </p>
									<a href="/bag/buy">Shipping</a>
									<a href="/">Cancellation	</a>
									<a href="/order/buy">Returns</a>
									<a href="/wish/love">Whitehat</a>
									<a href="/">Blog</a>
									<a href="/">Careers</a>
									<a href="/">Privacy policy	</a>
								</div>
							</div>
						</MDBCol>
						<MDBCol md="1"></MDBCol>
						<MDBCol md="4">
							<div className="desktop-genericInfo">
								<div className="desktop-shopLinks">
									<p className="desktop-gInfoTitle exp">
										EXPERIENCE MYNTRA APP ON MOBILE </p>
									<div className="desktop-downLinkContainer">
										<a href="/">
											<img className="desktop-androidDownLink" src="https://assets.myntassets.com/assets/images/retaillabs/2018/10/16/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png" />
										</a>
										<a href="/">
											<img className="desktop-iOSDownLink" src="https://assets.myntassets.com/assets/images/retaillabs/2018/10/16/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png" />
										</a>
									</div>
									<div className="desktop-keepInTouch"> KEEP IN TOUCH </div>
									<a href="/" className=""><img className="logo" src="https://bit.ly/38rP9GK" /></a>
									<a href="/" className="tiwtter-pl"><img className="logo" src="https://bit.ly/38vsBoE" /></a>
									<a href="/" className="youtube-pl"><img className="logo" src="https://bit.ly/2NQg3jP" /></a>
									<a href="/" className="inst-pl"><img className="logo" src="https://bit.ly/3avR8M0" /></a>
								</div>
							</div>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</MDBFooter>
		</div>
	);
}

export default FooterPage;