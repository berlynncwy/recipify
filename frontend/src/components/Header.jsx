import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Header = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const handleLogout = () => {
        logout();
    };
    const isLoggedOut = user == null;

    const showAccountButtons = () => {
        if (user) {
            if (user.isAdmin) {
                return (
                    <Button
                        // variant="outline-light"
                        onClick={handleLogout}
                        as={Link}
                        to="/login"
                        className="btn-sm lg:font-bold lg:uppercase lg:tracking-wide lg:text-xs bg-green border-green-800 bg-green-800 hover:bg-green-950 hover:border-green-950"
                    >
                        Log out
                    </Button>
                );
            } else {
                return (
                    <div className="flex">
                        <Dropdown>
                            <Dropdown.Toggle
                                className="hidden lg:flex lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide mr-3"
                                variant="outline-dark"
                                id="dropdown-basic"
                            >
                                Account
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/myrecipes">
                                    My Recipes
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button
                            // variant="outline-light"
                            onClick={handleLogout}
                            as={Link}
                            to="/login"
                            className="btn-sm lg:font-bold lg:uppercase lg:tracking-wide lg:text-xs bg-green border-green-800 bg-green-800 hover:bg-green-950 hover:border-green-950"
                        >
                            Log out
                        </Button>
                    </div>
                );
            }
        } else {
            return (
                <div className="flex items-center">
                    <Button
                        variant="success"
                        as={Link}
                        to="/login"
                        className="btn-sm lg:font-bold lg:uppercase lg:tracking-wide lg:text-xs mr-3"
                    >
                        Login
                    </Button>
                    <Button
                        variant="success"
                        as={Link}
                        to="/signup"
                        className="btn-sm lg:font-bold lg:uppercase lg:tracking-wide lg:text-xs"
                    >
                        Sign up
                    </Button>
                </div>
            );
        }
    };

    return (
        <header className="border-b border-gray-100">
            <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    {user && user.isAdmin ? (
                        <>
                            <Link
                                to="/admin"
                                className="flex items-center gap-1"
                            >
                                <svg
                                    version="1.0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="35pt"
                                    height="35pt"
                                    viewBox="0 0 128.000000 128.000000"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <g
                                        transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)"
                                        fill="#000000"
                                        stroke="none"
                                    >
                                        <path
                                            d="M501 1265 c-237 -54 -436 -255 -486 -491 -96 -451 308 -855 759 -759
                    304 64 521 350 503 660 -16 268 -188 489 -447 575 -85 28 -240 35 -329 15z
                    m300 -51 c199 -59 355 -216 415 -419 24 -80 24 -229 0 -310 -60 -205 -216
                    -361 -421 -421 -81 -24 -230 -24 -310 0 -206 61 -360 215 -421 421 -24 81 -24
                    229 0 310 69 233 262 402 501 439 51 7 179 -3 236 -20z"
                                        />
                                        <path
                                            d="M590 1064 c-77 -13 -110 -27 -110 -47 0 -17 4 -19 33 -11 17 4 76 9
                    130 10 99 2 130 11 105 31 -15 12 -120 23 -158 17z"
                                        />
                                        <path
                                            d="M366 944 c-3 -9 -6 -56 -6 -106 0 -90 0 -91 35 -130 22 -23 34 -46
                    31 -56 -2 -9 -7 -95 -11 -190 -6 -150 -5 -176 9 -197 21 -32 77 -34 107 -4 20
                    20 21 27 14 198 -3 97 -9 184 -11 193 -3 10 9 33 31 56 35 39 35 40 35 130 0
                    98 -5 122 -25 122 -20 0 -25 -24 -25 -117 0 -81 -2 -87 -30 -120 -16 -18 -30
                    -41 -30 -51 0 -9 5 -93 10 -186 6 -92 8 -177 5 -187 -8 -25 -42 -25 -50 0 -3
                    10 -1 95 5 187 5 93 10 177 10 186 0 10 -13 33 -30 51 -28 33 -30 39 -30 120
                    0 93 -5 117 -25 117 -7 0 -16 -7 -19 -16z"
                                        />
                                        <path
                                            d="M437 954 c-4 -4 -7 -52 -7 -106 0 -89 2 -99 18 -96 15 3 17 16 17
                    102 0 92 -8 120 -28 100z"
                                        />
                                        <path
                                            d="M495 948 c-3 -8 -5 -55 -3 -104 3 -76 6 -89 21 -92 16 -3 17 5 15 99
                    -2 71 -7 104 -15 107 -7 2 -15 -3 -18 -10z"
                                        />
                                        <path
                                            d="M736 928 c-60 -60 -68 -198 -16 -253 22 -23 22 -27 15 -204 -6 -159
                    -5 -184 9 -206 21 -33 76 -35 107 -4 21 21 21 26 14 206 -7 181 -7 185 15 208
                    76 81 19 285 -80 285 -23 0 -41 -9 -64 -32z m86 -19 c28 -15 48 -69 48 -129 0
                    -42 -5 -55 -30 -82 -27 -27 -30 -37 -26 -72 3 -23 7 -108 8 -191 l3 -150 -25
                    0 -25 0 3 150 c1 83 5 168 8 191 4 35 1 45 -26 72 -25 27 -30 40 -30 82 0 58
                    20 113 47 129 23 13 20 13 45 0z"
                                        />
                                        <path
                                            d="M935 910 c-4 -6 7 -32 23 -58 43 -67 62 -133 62 -210 0 -87 -20 -150
                    -70 -223 -42 -62 -46 -74 -30 -84 16 -10 70 54 101 121 38 79 50 155 39 237
                    -11 78 -22 106 -63 175 -30 50 -49 63 -62 42z"
                                        />
                                        <path
                                            d="M276 858 c-35 -61 -46 -93 -55 -168 -11 -85 1 -157 37 -234 32 -67
                    86 -131 102 -121 16 10 12 22 -30 84 -55 81 -73 146 -68 246 3 65 10 93 37
                    147 30 61 34 88 11 88 -5 0 -20 -19 -34 -42z"
                                        />
                                        <path
                                            d="M574 249 c-12 -20 16 -34 66 -34 50 0 78 14 66 34 -9 14 -123 14
                    -132 0z"
                                        />
                                    </g>
                                </svg>
                                <span className="font-mono font-medium text-3xl">
                                    Recipify
                                </span>
                            </Link>
                        </>
                    ) : (
                        <Link to="/" className="flex items-center gap-1">
                            <svg
                                version="1.0"
                                xmlns="http://www.w3.org/2000/svg"
                                width="35pt"
                                height="35pt"
                                viewBox="0 0 128.000000 128.000000"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <g
                                    transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)"
                                    fill="#000000"
                                    stroke="none"
                                >
                                    <path
                                        d="M501 1265 c-237 -54 -436 -255 -486 -491 -96 -451 308 -855 759 -759
                    304 64 521 350 503 660 -16 268 -188 489 -447 575 -85 28 -240 35 -329 15z
                    m300 -51 c199 -59 355 -216 415 -419 24 -80 24 -229 0 -310 -60 -205 -216
                    -361 -421 -421 -81 -24 -230 -24 -310 0 -206 61 -360 215 -421 421 -24 81 -24
                    229 0 310 69 233 262 402 501 439 51 7 179 -3 236 -20z"
                                    />
                                    <path
                                        d="M590 1064 c-77 -13 -110 -27 -110 -47 0 -17 4 -19 33 -11 17 4 76 9
                    130 10 99 2 130 11 105 31 -15 12 -120 23 -158 17z"
                                    />
                                    <path
                                        d="M366 944 c-3 -9 -6 -56 -6 -106 0 -90 0 -91 35 -130 22 -23 34 -46
                    31 -56 -2 -9 -7 -95 -11 -190 -6 -150 -5 -176 9 -197 21 -32 77 -34 107 -4 20
                    20 21 27 14 198 -3 97 -9 184 -11 193 -3 10 9 33 31 56 35 39 35 40 35 130 0
                    98 -5 122 -25 122 -20 0 -25 -24 -25 -117 0 -81 -2 -87 -30 -120 -16 -18 -30
                    -41 -30 -51 0 -9 5 -93 10 -186 6 -92 8 -177 5 -187 -8 -25 -42 -25 -50 0 -3
                    10 -1 95 5 187 5 93 10 177 10 186 0 10 -13 33 -30 51 -28 33 -30 39 -30 120
                    0 93 -5 117 -25 117 -7 0 -16 -7 -19 -16z"
                                    />
                                    <path
                                        d="M437 954 c-4 -4 -7 -52 -7 -106 0 -89 2 -99 18 -96 15 3 17 16 17
                    102 0 92 -8 120 -28 100z"
                                    />
                                    <path
                                        d="M495 948 c-3 -8 -5 -55 -3 -104 3 -76 6 -89 21 -92 16 -3 17 5 15 99
                    -2 71 -7 104 -15 107 -7 2 -15 -3 -18 -10z"
                                    />
                                    <path
                                        d="M736 928 c-60 -60 -68 -198 -16 -253 22 -23 22 -27 15 -204 -6 -159
                    -5 -184 9 -206 21 -33 76 -35 107 -4 21 21 21 26 14 206 -7 181 -7 185 15 208
                    76 81 19 285 -80 285 -23 0 -41 -9 -64 -32z m86 -19 c28 -15 48 -69 48 -129 0
                    -42 -5 -55 -30 -82 -27 -27 -30 -37 -26 -72 3 -23 7 -108 8 -191 l3 -150 -25
                    0 -25 0 3 150 c1 83 5 168 8 191 4 35 1 45 -26 72 -25 27 -30 40 -30 82 0 58
                    20 113 47 129 23 13 20 13 45 0z"
                                    />
                                    <path
                                        d="M935 910 c-4 -6 7 -32 23 -58 43 -67 62 -133 62 -210 0 -87 -20 -150
                    -70 -223 -42 -62 -46 -74 -30 -84 16 -10 70 54 101 121 38 79 50 155 39 237
                    -11 78 -22 106 -63 175 -30 50 -49 63 -62 42z"
                                    />
                                    <path
                                        d="M276 858 c-35 -61 -46 -93 -55 -168 -11 -85 1 -157 37 -234 32 -67
                    86 -131 102 -121 16 10 12 22 -30 84 -55 81 -73 146 -68 246 3 65 10 93 37
                    147 30 61 34 88 11 88 -5 0 -20 -19 -34 -42z"
                                    />
                                    <path
                                        d="M574 249 c-12 -20 16 -34 66 -34 50 0 78 14 66 34 -9 14 -123 14
                    -132 0z"
                                    />
                                </g>
                            </svg>
                            <span className="font-mono font-medium text-3xl">
                                Recipify
                            </span>
                        </Link>
                    )}
                </div>
                <div className="flex flex-1 items-center justify-end gap-8 ">
                    <nav
                        aria-label="Global"
                        className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-500"
                    >
                        {user && user.isAdmin ? (
                            <>
                                <Link
                                    to="/admin"
                                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-green-700"
                                >
                                    Admin
                                </Link>
                                <Link
                                    to="/admin/products"
                                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-green-700"
                                >
                                    Products
                                </Link>
                                <Link
                                    to="/admin/suppliers"
                                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-green-700"
                                >
                                    Suppliers
                                </Link>
                                <Link
                                    to="/admin/orders"
                                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-green-700"
                                >
                                    Orders
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/recipes"
                                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-green-700"
                                >
                                    Recipes
                                </Link>

                                <Link
                                    to="/products"
                                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-green-700"
                                >
                                    Products
                                </Link>

                                {!isLoggedOut && (
                                    <Link
                                        to="/favourites"
                                        className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-green-700"
                                    >
                                        Favourites
                                    </Link>
                                )}

                                {!isLoggedOut && (
                                    <Link
                                        to="/orders"
                                        className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-green-700"
                                    >
                                        Orders
                                    </Link>
                                )}

                                {!isLoggedOut && (
                                    <Link
                                        to="/cart"
                                        className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-green-700"
                                    >
                                        Cart
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>

                    <div className="flex items-center">
                        <div className="flex items-center border-x border-gray-100">
                            <span className="">{showAccountButtons()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;
