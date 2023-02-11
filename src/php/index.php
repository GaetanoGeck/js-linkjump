<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<link href="style.css" rel="stylesheet">

		<title>〉linkjump</title>
	</head>
	<body>

		<div class="container mx-auto m-2">
			<label id="Status" for="Command"></label>
			<input id="Command" type="text" class="form-control mb-3" placeholder="Jump to ..." autofocus/>
			<div class="container m-2">
				<div id="LinkGroups"></div>
			</div>
		</div>

		<script>var exports = {};</script>
		<script src="linkjump-bundle.js"></script>
		<script>initLinkjump();</script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

		<!-- BEGIN OF USER-DEFINED LINKS -->
		<script src="links.js"></script>
		<!-- END OF USER-DEFINED LINKS -->

	</body>
</html>
