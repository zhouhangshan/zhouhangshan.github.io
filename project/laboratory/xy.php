<?php
// 获取当前的时间，使用北京时区
date_default_timezone_set('Asia/Shanghai');
$current_time = date('Y-m-d H:i:s');

// 检查是否有地理位置信息被POST提交
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 获取经度和纬度
    $longitude = $_POST['longitude'];
    $latitude = $_POST['latitude'];
    
    // 将信息写入文件
    $file = 'information.txt';
    $data = "$longitude, $latitude, $current_time\n";
    
    if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX) !== false) {
        echo "地理位置信息已成功记录。";
    } else {
        echo "记录地理位置信息失败。";
    }
} else {
    echo "无效的请求。";
}
?>

<html>
<head>
    <script type="text/javascript">
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // 获取到用户的地理位置信息
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // 使用AJAX将地理位置信息发送到PHP文件
                const xhr = new XMLHttpRequest();
                const url = 'xy.php'; // 替换成你的PHP文件路径
                const params = `longitude=${longitude}&latitude=${latitude}`;
                xhr.open('POST', url, true);

                // 设置请求头，确保服务器能正确解析请求
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                // 发送请求
                xhr.send(params);
            },
            function(error) {
                // 获取地理位置信息失败
                console.error(`获取地理位置失败：${error.message}`);
            }
        );
    } else {
        console.error("您的浏览器不支持地理位置功能");
    }
    </script>
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>