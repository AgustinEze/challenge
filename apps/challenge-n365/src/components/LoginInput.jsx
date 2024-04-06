/* eslint-disable react/prop-types */
export const LoginInput = ({ label, children }) => {
    return (
        <div>
            <label>{label}</label>
            {children}
        </div>
    )
}