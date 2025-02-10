import { HOMES_ASSETS } from '../../utils/homesAssets';
import logo from '../../assets/logo.svg';
import './cover.css';

const Cover = ({ data }) => {
    const houseName = typeof data === 'string' ? data : data.casa;
    // const houseName = data.casa;
    const coverImage = HOMES_ASSETS[houseName].cover;

    if (!coverImage) return null;


    return (
        <div className="cost">
            <div className="portada">
                <img className="logo-icon" src={logo} alt="VIVLA" />
                <img className="img-icon" src={coverImage} alt={houseName} />
                <div className="footer-container">
                    <div className="modelo">MODELO</div>
                    <div className="informe-anual">INFORME ANUAL</div>
                </div>
            </div>
        </div>
    );
};

export default Cover;
