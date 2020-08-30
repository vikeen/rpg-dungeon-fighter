import React, {useEffect} from 'react'
import $ from 'jquery'

const InputFieldError = ({errors = {}, fieldId = ""}) => {
    const error = errors[fieldId]

    console.log(errors, error)
    useEffect(() => {
        $(`#${fieldId}`).toggleClass("is-invalid", !!error)
    }, [error, fieldId])

    if (!error) return null

    return (
        <div className="invalid-feedback">
            {error.message}
        </div>
    )
}

export default InputFieldError
