import React from 'react'

export default ({ height = 17, width = 17 }) => (
  <i>
    <svg width={width} height={height} viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.726 15.402c.365.366.365.96 0 1.324-.178.178-.416.274-.663.274-.246 0-.484-.096-.663-.274L8.323 9.648h.353L1.6 16.726c-.177.178-.416.274-.663.274-.246 0-.484-.096-.663-.274-.365-.365-.365-.958 0-1.324L7.35 8.324v.35L.275 1.6C-.09 1.233-.09.64.274.274c.367-.365.96-.365 1.326 0l7.076 7.078h-.353L15.4.274c.366-.365.96-.365 1.326 0 .365.366.365.958 0 1.324L9.65 8.675v-.35l7.076 7.077z"
        fill="#FFF"
        fillRule="evenodd"
      />
    </svg>
  </i>
)
