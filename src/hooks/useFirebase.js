import { useState } from "react";

const useFirebase = () => {
    const [errObj, setErrObj] = useState({});
    const [info, setInfo] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [validPass, setValidPass] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const regexEmail = /^(\w+([.-]?\w+)*).{6,}@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,23}$/;

    const handleEmail = event => {
        const e = event.target.value;
        setEmail(e);

        if (e.match(regexEmail)) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
        }
    };

    const handlePass = event => {
        const p = event.target.value;
        setPassword(p);

        if (p.match(regexPass)) {
            setValidPass(true);
        } else {
            setValidPass(false);
        }
    };

    return {
        errObj, setErrObj,
        info, setInfo,
        email, setEmail,
        password, setPassword,
        validEmail, setValidEmail,
        validPass, setValidPass,
        showModal, setShowModal,
        showToast, setShowToast,
        handleEmail, handlePass
    };
};

export default useFirebase;