# [CommunityPG](http://aws-and-community-pg.ap-northeast-1.elasticbeanstalk.com/Login.html)

### "CommunityPG" はポートフォリオとして作成した社内コミュニケーションサイトです。
<br>



# URL
http://aws-and-community-pg.ap-northeast-1.elasticbeanstalk.com/Login.html/
<br><br><br>



# Overview
1. **従業員検索機能**
   + 検索欄に値を入力し、従業員情報を検索できます。
2. **電子会議室**
   + 掲示板のようにトピックを作成し、作成されたそれぞれのトピックに対し投稿を載せることができます。
3. **ファイル共有**
   + フォルダの作成・削除ができます。
   + ファイルアップロード・ダウンロード・削除ができます。
<br><br><br>



# Description
下記の3つ機能に対しそれぞれユーザー権限が「**User,Manager,Admin**」で3種類あり利用できる機能を制限しています。<br>
<br>

1. ***従業員検索画面***
   1. 全て空白の場合は全件検索を行います。
      - 入力値がある場合、その値であいまい検索を行います。
   2. ユーザーを押下すると、プロフィールが表示されます。
      - ログイン中のユーザー権限によって処理を制御しています。
        | 権限		| 変更		| ユーザー削除     | 
        |:---:		|:---:		|:---:          |
        | **User**	| 自身の情報のみ〇 	| ✕      	|
        | **Manager**	| 自身の情報のみ〇	| 自分の情報以外〇 	|
        | **Admin**	| 全て〇		| 自分の情報以外〇	| 
        
       ![](https://cpp-learning.com/wp-content/uploads/2019/05/pyxel-190505-161951.gif)<br><br>
<br>
        
2. ***電子会議室***
   1. トピックを作成することができます。
   2. 作成されたトピックに対して、投稿をする事ができます。
   3. 投稿に対して、**Like・Bad** ボタンを押し評価を付けることができます。<br>
      - 評価は、1ユーザー、1つの投稿に対し、**Like・Bad** のいずれか1件まで）
   4. トピックや投稿を編集・削除することができます。
      - ログイン中のユーザー権限によって処理を制御しています。
        | 権限         | 編集                  | 削除                    | 
        |:-----------:|:-----------------:    :--------------:        |
        | **User**    | 自身の投稿・トピックのみ〇   | 自身の投稿・トピックのみ〇   |
        | **Manager** | 自身の投稿・トピックのみ〇   | 全て〇           |
        | **Admin**   | 全て〇                    | 全て〇             | 
 <br>         
      ![](https://cpp-learning.com/wp-content/uploads/2019/05/pyxel-190505-161951.gif)<br><br>
<br>      
       

3. ***ファイル共有***
   1. フォルダの作成や削除、ファイル共有などが行えます。
   2. フォルダ内に入ったり、前のフォルダに戻ったり、ファイルを保存したりできます。<br><br>
      - ログイン中のユーザー権限によって処理を制御しています。
        | 権限         | フォルダの削除   | ファイルの削除    | 
        |:-----------:|:-------------:  |:--------------:|
        | **User**    | ✕               | ✕              |
        | **Manager** | 〇              | 〇              | 
        | **Admin**   | 〇              | 〇              |
       ![](https://cpp-learning.com/wp-content/uploads/2019/05/pyxel-190505-161951.gif)<br><br>
<br><br><br>



# Features
Physics_Sim_Py used [pyxel](https://github.com/kitao/pyxel) only.

```python
import pyxel
```
[Pyxel](https://github.com/kitao/pyxel) is a retro game engine for Python.
<br><br><br>


# Requirement
* Java 11
<br><br><br>


# Usage
1. DDLファイルのCREATE文を実行し各テーブルを作成
2. DMLファイルのインサート文を実行し、初期データを作成
3. eclispeでgradleプロジェクトをビルドし実行
   + Eclipseにbuildshipプラグインをインストール<br>
     (Pleiades4.7.2以降は不要)
   + プロジェクト右クリック ⇒ 構成 ⇒ Gradleネーチャーの追加
   + build.gradleの作成
     + プロジェクト右クリック ⇒ Gradle ⇒ Gradleプロジェクトのリフレッシュ
     + 自動的にeclipseがプロジェクトを認識してパッケージビューに依存するプロジェクトとして追加される
4. Spring boot プロジェクトの実行
<br><br><br>


# Author
* Kouya Ajima
<br><br><br>

# License
[MIT license](https://en.wikipedia.org/wiki/MIT_License).


