import React from 'react';

const ConfirmationModal = ({ title, message, actionButtonName, closeModal, actionData, actionFunction }) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label
                            onClick={() => actionFunction(actionData)}
                            htmlFor="confirmation-modal"
                            className="btn btn-md btn-error text-white">{actionButtonName}</label>
                        <button onClick={closeModal} className='btn ben-md  btn-outline'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;