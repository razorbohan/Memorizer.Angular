import { InitiateJsGrid, ShowJsGrid } from './jsgrid';

$(document).ready(() => {
    window.history.replaceState(null, null, window.location.href);
});

$(window).on("load", async () => {
    let mode = $.cookie("mode") == 'Repeat' ? 'Learn' : 'Repeat'
    $("#switchModeButton").attr('href', `/Home/Mode/${mode}`);
    $("#switchModeButton").text(mode);

    /////////////////modals

    $("#findNewMemo").click(() => {
        let key = $("#findKey").val();
        let value = $("#findValue").val();

        ShowJsGrid(
            async (filter) => await asyncGet(`/Home/Find/${key}/${value}`),
            (memo) => { asyncPost("/Home/Add", memo); },
            (memo) => { asyncPost("/Home/Update", memo); },
            (memo) => { asyncPost("/Home/Delete/" + memo.id); });

        $("#findModal").find(".modal-dialog").css("max-width", "90%");
    });

    $("#findModal").on("hidden.bs.modal", (event) => {
        $("#findKey").val("");
        $("#findValue").val("");
        if ($("#jsGrid").children().length > 0)
            $("#jsGrid").jsGrid("destroy");
        $(event.target).find(".modal-dialog").css("max-width", "");
    });

    InitiateJsGrid();
});