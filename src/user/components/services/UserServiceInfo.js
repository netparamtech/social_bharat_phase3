import { useEffect, useState } from "react";

const UserServiceInfo = () => {
    const [isAndroidUsed, setIsAndroidUsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const buttonStyle = {
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.5)' : 'scale(1)',
        borderRadius: '20px'
    };
    useEffect(() => {
        const handleResize = () => {
            setIsAndroidUsed(window.innerWidth < 1000); // Adjust the threshold based on your design considerations
        };

        // Listen for window resize events
        window.addEventListener("resize", handleResize);
        handleResize(); // Call initially to set the correct value

        // Cleanup the event listener when component is unmounted
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div id="auth-wrapper" className="border border-dark rounded-4 " style={{backgroundColor:"#DAFFA4"}}>
            {/* Heading */}
            <div className="text-center fs-3 fw-bold mt-3 text-danger">Transportation Service</div>
            <div className="row g-0 px-4 py-2 m-4 mt-0 shadow-lg rounded-4 mt-2"  >
                {/* Left Section */}
                <div className="col-sm-6 col-md-8 p-3">
                    {/* Profile Card */}
                    <div class="col-md-8">
                        <div class="">
                            <div className=" mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img
                                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                            className="img-fluid rounded-circle"
                                            alt="..."
                                        ></img>
                                    </div>
                                    <div className="col-md-8 px-3 py-2">
                                        <div className="card-body">
                                            <h5 className="card-title">UserName</h5>
                                            <div className="card-text">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                sed do eiusmod tempor incididunt ut labore et dolore
                                                magna aliqua
                                            </div>
                                            <div className="py-2">
                                                <h5 className="card-title">Mobile No.</h5>
                                                1234567890
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Service Charges */}
                    <div>
                        <h5>Service Charges</h5>
                        <ul class="list-group col-md-7">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Rickshaw
                                <span class="badge text-bg-primary rounded-pill">10Rs/Km</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Pickup
                                <span class="badge text-bg-primary rounded-pill">25Rs/Km</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Truck
                                <span class="badge text-bg-primary rounded-pill">50Rs/Km</span>
                            </li>
                        </ul>
                    </div>

                    {/* Availability */}
                    <div className="my-3">
                        <h5>Availability</h5>
                        <ul className="list-group list-group-horizontal text-break">
                            <ul class="list-group list-group-vertical">
                                <li class="list-group-item">Rickshaw</li>
                                <li class="list-group-item">4</li>
                            </ul>
                            <ul class="list-group list-group-vertical">
                                <li class="list-group-item">Pickup</li>
                                <li class="list-group-item">2</li>
                            </ul>
                            <ul class="list-group list-group-vertical">
                                <li class="list-group-item">Truck</li>
                                <li class="list-group-item">1</li>
                            </ul>
                        </ul>
                    </div>

                    {/* Service Location */}
                    <div className="my-3">
                        <h5>Service Location</h5>
                        <ul class={`list-group ${isAndroidUsed ? 'list-group-vertical' : 'list-group-horizontal'} text-break`}>
                            <li class="list-group-item">Jaipur</li>
                            <li class="list-group-item">Sikar</li>
                            <li class="list-group-item">Jodhpur</li>
                            <li class="list-group-item">Udaipur</li>
                            <li class="list-group-item">Kota</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="my-3">
                        <div class="form-floating ">
                            <textarea
                                class="form-control"
                                placeholder="Leave a comment here"
                                id="floatingTextarea2"
                                style={{ height: "100px" }}
                            ></textarea>
                            <label for="floatingTextarea2">Message</label>
                        </div>
                    </div>

                </div>
                {/* Right Section */}
                <div className="col-sm-6 col-md-4 px-2">
                    {/* Providing Services */}
                    <div>
                        <h3>Providing Services</h3>
                        {/* Carousel */}
                        <div
                            id="carouselExampleDark"
                            className="carousel carousel-dark slide"
                        >
                            <div className="carousel-indicators">
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleDark"
                                    data-bs-slide-to="0"
                                    className="active"
                                    aria-current="true"
                                    aria-label="Slide 1"
                                ></button>
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleDark"
                                    data-bs-slide-to="1"
                                    aria-label="Slide 2"
                                ></button>
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleDark"
                                    data-bs-slide-to="2"
                                    aria-label="Slide 3"
                                ></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="10000" style={{ height: '350px', width: '100%' }}>
                                    <img
                                        src="https://media.gettyimages.com/id/641036274/photo/heavily-laden-pickup.jpg?s=612x612&w=gi&k=20&c=T8K02g6Em-PoskOPf6tcu_OaF5emNso_7Y3q1dNKXz0="
                                        className="d-block w-100"
                                        alt="..."
                                    ></img>
                                    <div className="carousel-caption d-none d-md-block text-success">
                                        <h5>RIKHSHAW</h5>
                                        <p>For small stuff and normal transportation.</p>
                                    </div>
                                </div>
                                <div className="carousel-item" data-bs-interval="2000" style={{ height: '350px', width: '100%' }}>
                                    <img
                                        src="https://media.gettyimages.com/id/175590193/photo/dump-truck.jpg?s=612x612&w=gi&k=20&c=Bz481RLJTBl5ALztia_l84c2-TbsjeU781DKDw5sTIU="
                                        className="d-block w-100"
                                        alt="..."
                                    ></img>
                                    <div className="carousel-caption d-none d-md-block text-success">
                                        <h5>PICKUP</h5>
                                        <p>For medium sized furnitures and stuff.</p>
                                    </div>
                                </div>
                                <div className="carousel-item" style={{ height: '100%', width: '100%' }}>
                                    <img
                                        src="https://media.gettyimages.com/id/172153556/photo/conveyor-belt-loading-dump-trucks-at-road-construction-site.jpg?s=2048x2048&w=gi&k=20&c=vaAe4R6byqr5Xw3YjqsafT1vLXbRscRbhnM9SpYepJQ="
                                        className="d-block w-100"
                                        alt="..."
                                    ></img>
                                    <div className="carousel-caption d-none d-md-block text-success">
                                        <h5>TRUCK</h5>
                                        <p>For big sized furnitures.</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselExampleDark"
                                data-bs-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselExampleDark"
                                data-bs-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    {/* Textarea */}
                    <div className="mt-1">
                        <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label fs-4"
                        >
                            Feedback
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Stars */}
                    <div style={{ fontSize: "180%", color: "yellowgreen" }}>☆☆☆☆☆</div>
                    <button type="button" class="btn btn-outline-success my-2 mx-auto">
                        UPDATE
                    </button>

                    <button type="button" class="btn btn-outline-success my-2 mx-auto">
                        SUBMIT
                    </button>

                </div>
            </div>
            {/* <span class="badge text-bg-primary rounded-pill">25Rs/Km</span> */}
        </div>
    );
}
export default UserServiceInfo;