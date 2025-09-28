const DealerLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {

    return (

        <div id="dealer-wrapper" className="w-screen h-full overflow-x-hidden">

            <div className="navbar w-screen px-5 bg-[#252b3e] text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a href="">Dashboard</a></li>
                            <li><a href="">Transactions</a></li>
                            <li><a href="/dealer/documents">Documents</a></li>
                            <li><a href="">Templates</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl" href="/dealer">Pull Papers [logo]</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a href="">Dashboard</a></li>
                        <li><a href="">Transactions</a></li>
                        <li><a href="/dealer/documents">Documents</a></li>
                        <li><a href="">Templates</a></li>
                    </ul>
                </div>
                <div className="navbar-end">

                    <div className="avatar avatar-placeholder pr-3 cursor-pointer">
                        <div className="ring-primary ring-offset-base-100 ring-1 ring-offset-1 bg-neutral text-neutral-content w-10 rounded-full hover:bg-neutral-800">
                            <span className="text-xs">NF</span>
                        </div>
                    </div>

                </div>
            </div>

            <div id="content" className="mx-5 pt-5">
                {children}
            </div>

        </div>


    )

}

export default DealerLayout;