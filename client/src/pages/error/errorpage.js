import React from "react";
import '../../styles/error.css';

function Errorpage() {
    return (
        <div className="error404_bg">
            <div class="bowl">
                <div class="spdline"></div>
                <div class="spider">
                    <div class="leg left-1"></div>
                    <div class="leg left-2"></div>
                    <div class="leg left-3"></div>
                    <div class="leg right-1"></div>
                    <div class="leg right-2"></div>
                    <div class="leg right-3"></div>
                </div>
            </div>
            <div class="ghost">
                <div class="eye eye-left"></div>
                <div class="eye eye-right"></div>
                <div class="chocolate"></div>
                <div class="mouth"></div>
            </div>

            <div class="signwood"></div>
            <div class="signtext">
                <p>404<br />Page not found</p>
            </div>
            <div class="pin"></div>

            <div class="line"></div>
        </div>
    );
}



export default Errorpage;