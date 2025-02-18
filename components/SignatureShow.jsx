const SignatureShow = ({ data }) => {
  if (data.type === "draw") {
    return (
      <img
        src={data.url}
        alt='signature'
        className='w-60 h-10 border rounded flex justify-center items-center'
      />
    )
  }
  if (data.type === "type") {
    return (
      <div className='w-60 h-10 border bg-gray-300 rounded flex justify-center items-center'>
        {data.text}
      </div>
    )
  }
  if (data.type === "image") {
    return (
      <img
        src={data.url}
        alt='signature'
        className='w-60 h-10 border rounded flex justify-center items-center'
      />
    )
  }
}

export default SignatureShow