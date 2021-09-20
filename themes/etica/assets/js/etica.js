hljs.highlightAll();

// get the list of all highlight code blocks
const highlights = document.querySelectorAll("div.code-block pre")


// credit https://spdevuk.com/how-to-create-code-copy-button/
highlights.forEach(div => {
    // create the copy button
    const copy = document.createElement("button")
    copy.innerHTML = "<i class='gg-copy'></i>"
    // add the event listener to each click
    copy.addEventListener("click", handleCopyClick)
    // append the copy button to each code block
    div.append(copy)
})

$('div.code-block button').addClass('btn');

const copyToClipboard = str => {
    const el = document.createElement("textarea") // Create a <textarea> element
    el.value = str // Set its value to the string that you want copied
    el.setAttribute("readonly", "") // Make it readonly to be tamper-proof
    el.style.position = "absolute"
    el.style.left = "-9999px" // Move outside the screen to make it invisible
    document.body.appendChild(el) // Append the <textarea> element to the HTML document
    const selected =
          document.getSelection().rangeCount > 0 // Check if there is any content selected previously
          ? document.getSelection().getRangeAt(0) // Store selection if found
          : false // Mark as false to know no selection existed before
    el.select() // Select the <textarea> content
    document.execCommand("copy") // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el) // Remove the <textarea> element
    if (selected) {
        // If a selection existed before copying
        document.getSelection().removeAllRanges() // Unselect everything on the HTML document
        document.getSelection().addRange(selected) // Restore the original selection
    }
}

function handleCopyClick(evt) {
    // get the children of the parent element
    const { children } = evt.target.parentElement
    // grab the first element (we append the copy button on afterwards, so the first will be the code element)
    // destructure the innerText from the code block
    const { innerText } = Array.from(children)[0]
    // copy all of the code to the clipboard
    copyToClipboard(innerText)
    // alert to show it worked, but you can put any kind of tooltip/popup to notify it worked
    // alert(innerText)
    halfmoon.initStickyAlert({
      content: "Copied code!",      // Required, main content of the alert, type: string (can contain HTML)
    });
}
