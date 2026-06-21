const streamService =
  require("../services/streamService");

async function createStream(
  req,
  res
) {
  try {
    const schoolId =
      req.user.schoolId;

    const stream =
      await streamService.createStream(
        schoolId,
        req.body
      );

    res.status(201).json({
      success: true,
      data: stream,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to create stream",
    });
  }
}

async function getStreams(
  req,
  res
) {
  try {
    const schoolId =
      req.user.schoolId;

    const streams =
      await streamService.getStreams(
        schoolId
      );

    res.json({
      success: true,
      data: streams,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch streams",
    });
  }
}

async function updateStream(
  req,
  res
) {
  try {
    const schoolId =
      req.user.schoolId;

    const streamId =
      req.params.id;

    const stream =
      await streamService.updateStream(
        schoolId,
        streamId,
        req.body
      );

    res.json({
      success: true,
      data: stream,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update stream",
    });
  }
}

async function deleteStream(
  req,
  res
) {
  try {
    const schoolId =
      req.user.schoolId;

    const streamId =
      req.params.id;

    await streamService.deleteStream(
      schoolId,
      streamId
    );

    res.json({
      success: true,
      message:
        "Stream deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to delete stream",
    });
  }
}

module.exports = {
  createStream,
  getStreams,
  updateStream,
  deleteStream,
};