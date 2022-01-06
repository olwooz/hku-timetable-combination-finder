import GitHubIcon from '@mui/icons-material/GitHub';

function Footer(){
    return(
        <footer className="footer" style={{color: "gray", bottom: 0}}>
            <span>Made by Dongun Yi </span>
            <span className="footer-icon"><GitHubIcon onClick={()=>window.open('https://github.com/dyi919/hku-timetable', '_blank')}/></span>
        </footer>
    );
}

export default Footer;