import React from 'react'

const Contact = () => {
    return (
        <section className="ftco-section contact-section ftco-no-pb" id="contact-section">
            <div className="container">
                <div className="row justify-content-center mb-5 pb-3">
                    <div className="col-md-7 heading-section text-center ftco-animate">
                        <h1 className="big big-2">Contact</h1>
                        <h2 className="mb-4">Contact Me</h2>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
                    </div>
                </div>

                <div className="row d-flex contact-info mb-5">
                    <div className="col-md-6 col-lg-3 d-flex ftco-animate">
                        <div className="align-self-stretch box p-4 text-center">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <span className="icon-map-signs"></span>
                            </div>
                            <h3 className="mb-4">Address</h3>
                            <p>198 West 21th Street, Suite 721 New York NY 10016</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 d-flex ftco-animate">
                        <div className="align-self-stretch box p-4 text-center">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <span className="icon-phone2"></span>
                            </div>
                            <h3 className="mb-4">Contact Number</h3>
                            <p><a href="tel://1234567920">+ 1235 2355 98</a></p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 d-flex ftco-animate">
                        <div className="align-self-stretch box p-4 text-center">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <span className="icon-paper-plane"></span>
                            </div>
                            <h3 className="mb-4">Email Address</h3>
                            <p><a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 d-flex ftco-animate">
                        <div className="align-self-stretch box p-4 text-center">
                            <div className="icon d-flex align-items-center justify-content-center">
                                <span className="icon-globe"></span>
                            </div>
                            <h3 className="mb-4">Website</h3>
                            <p><a href="#">yoursite.com</a></p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
export default Contact