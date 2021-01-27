import styles from "./Header.module.scss";
import Link from 'next/link';
import { useRouter } from 'next/router';

const goBack = (event, router) => {
    event.preventDefault();
    router.back();
}

const Header = () => {
    const router = useRouter();
    
    const isHome = router.pathname === "/";

    return (
        <div className={styles.nav}>
            {
                !isHome &&
                <div className={styles.back}>
                    <a href="#" onClick={ (event) => {goBack(event, router)} }> {"<"} Back </a>
                </div>
            }
            <div class={styles.title}>
                <Link href="/">
                    <a>
                        <h1>
                            The E-Commerce
                        </h1>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Header
