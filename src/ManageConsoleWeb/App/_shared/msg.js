export default function msg(title, text, type) {
    let temp = new PNotify({
        title: title,
        text: text,
        type: type,
        styling: 'bootstrap3'
    });
}