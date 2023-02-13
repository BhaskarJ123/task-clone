import '../Header.css';

const Header = (props) => {
    let userFirstName = props.userName.substring(0,1).toUpperCase() + props.userName.substring(1);
    return (
        <div>
            <ul class="nav headerContainer">
                <li class="nav-item">
                    <h1>CARD91</h1>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><span>{userFirstName}</span></a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/">Signout</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Header;