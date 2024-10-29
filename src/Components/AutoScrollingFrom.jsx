import React from 'react';
import Card from './Card';
import { useSelector } from 'react-redux';


function AutoScrollingFrom({inspiredfrom, reverse}) {

   

    return (
        <div className="slider mt-10" reverse={reverse && "true"}>
            <div
                className="list relative" 
                style={{
                    '--quantity': '7',
                    '--height': '100px',
                    '--width': '250px',
                }}
            >
                {Object.keys(inspiredfrom).map((platform, index) => (
                    <div
                        key={index}
                        className="item"
                        style={{ '--position': index }} // Fixed inline style interpolation
                    >
                        <a
                            href={inspiredfrom[platform].url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={inspiredfrom[platform].logo}
                                alt={platform}
                                className="platform-logo"
                            />
                        </a>
                    </div>
                ))}
              
            </div>
        </div>

    );
}

export default AutoScrollingFrom;
