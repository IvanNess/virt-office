import React from 'react'

const MoreBtn = ({show}) => {
    return (
        <div className={`more-btn ${show?'show':'none'}`}>
            <p>
                Zobacz więcej
            </p>
            <style jsx>{`
                .more-btn.show {
                    position: absolute;
                    bottom: -28px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 226px;
                    height: 55px;
                    background: #CD0000 0% 0% no-repeat padding-box;
                    margin-top: -28px;
                    cursor: pointer;
                }
                .more-btn.none {
                    display: none;
                }
                .more-btn > p{
                    font: normal normal bold 16px/19px Work Sans;
                    letter-spacing: 0.8px;
                    color: #FFFFFF;
                    text-transform: uppercase;
                }
            `}</style>
        </div>
    )
}

export default MoreBtn
