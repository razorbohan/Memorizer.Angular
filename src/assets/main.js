import { InitiateJsGrid, ShowJsGrid } from './jsgrid';
import { GetMemos } from './memoGenerator';
import '../scss/main.scss';
import '../favicon.ico';

$(document).ready(() => {
    window.history.replaceState(null, null, window.location.href);
});

$(window).on("load", async () => {
    let mode = $.cookie("mode") == 'Repeat' ? 'Learn' : 'Repeat'
    $("#switchModeButton").attr('href', `/Home/Mode/${mode}`);
    $("#switchModeButton").text(mode);

    /////////////////modals

    $("#addModal").on("hidden.bs.modal", (event) => {
        $(event.target).find(".modal-body > textarea").val("");
    });

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

    $("#submitNewMemo").click(async () => {
        let body = {
            question: $("#addQuestionArea").val(),
            answer: $("#addAnswerArea").val()
        }

        let result = await asyncPost("/Home/Add", body);
        showMessage(result);

        $("#addModal").modal('hide');
    });

    $("#findModal").on("hidden.bs.modal", (event) => {
        $("#findKey").val("");
        $("#findValue").val("");
        if ($("#jsGrid").children().length > 0)
            $("#jsGrid").jsGrid("destroy");
        $(event.target).find(".modal-dialog").css("max-width", "");
    });

    $("#deleteButton").click(async (event) => {
        event.preventDefault();

        let result = await asyncPost(`/Home/Delete/${currentMemo._id}`);
        showMessage(result);

        currentMemo = await NextMemo(memosGenerator);
    });

    InitiateJsGrid();
});

function finish(mode) {
    $(".summary").css("visibility", "hidden");
    $("#finishMessage").text(mode);
    $("#finishModal").modal();
}