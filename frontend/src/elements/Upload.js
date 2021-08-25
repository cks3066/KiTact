import React from 'react'
import { Button } from '../elements'
import { storage } from '../shared/Firebase'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as imageActions } from '../redux/modules/image'

export const Upload = props => {
  const dispatch = useDispatch()
  const uploading = useSelector(state => state.image.uploading)
  const fileInput = React.useRef()

  const selectFile = e => {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.readAsDataURL(file)

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result))
    }
  }

  const uploadFB = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert('파일을 선택해주세요!')
      return
    }

    dispatch(imageActions.uploadImageFB(fileInput.current.files[0]))
  }

  return (
    <React.Fragment>
      <input type='file' ref={fileInput} onChange={selectFile} disabled={uploading} />
      <Button _onClick={uploadFB}>업로드하기</Button>
    </React.Fragment>
  )
}
