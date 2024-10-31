import os
import xml.etree.ElementTree as ET

def update_svg_titles(directory):
    # 注册默认的 SVG 命名空间
    ET.register_namespace('', "http://www.w3.org/2000/svg")
    
    for filename in os.listdir(directory):
        if filename.endswith('.svg'):
            file_path = os.path.join(directory, filename)
            
            try:
                # 读取SVG文件
                tree = ET.parse(file_path)
                root = tree.getroot()
                
                # 获取文件名（不含扩展名）
                name = os.path.splitext(filename)[0]
                
                # 查找title标签
                title = root.find('.//{http://www.w3.org/2000/svg}title')
                if title is not None and title.text == "新建项目":
                    # 更新title内容
                    title.text = name
                    
                    # 写回文件，不包含XML声明
                    tree.write(file_path, encoding='utf-8', xml_declaration=False)
                    print(f"Updated title in {filename}")
                else:
                    print(f"No matching title found in {filename}")
                    
            except Exception as e:
                print(f"Error processing {filename}: {str(e)}")

# 指定目录路径
directory = 'public/weather'

# 确保目录存在
if os.path.exists(directory):
    update_svg_titles(directory)
    print("Processing completed!")
else:
    print(f"Directory {directory} not found!")
